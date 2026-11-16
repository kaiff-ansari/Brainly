
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import PlusIcons from "../icons/PlusIcons";
import ShareIcon from "../icons/ShareIcon";
import MenuIcon from "../icons/MenuIcon";
import Sidebar from "../components/Sidebar";
import { useContent, type ContentItem } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useParams, useNavigate } from "react-router-dom";

function Dashboard() {
  const { hash } = useParams<{ hash?: string }>();
  const navigate = useNavigate();
  const isSharedView = Boolean(hash);

  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sharedUsername, setSharedUsername] = useState<string>("");
  const [sharedContents, setSharedContents] = useState<ContentItem[]>([]);
  const [sharedLoading, setSharedLoading] = useState(false);
  const [sharedError, setSharedError] = useState<string | null>(null);

  const { contents, refresh, loading } = useContent();

  // Redirect to signin if not in shared view and no token exists
  useEffect(() => {
    if (!isSharedView) {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        navigate("/signin");
      }
    }
  }, [isSharedView, navigate]);

  // Fetch shared brain if hash param is present
  useEffect(() => {
    if (hash) {
      setSharedLoading(true);
      axios
        .get(`${BACKEND_URL}/api/v1/brain/${hash}`)
        .then((response) => {
          setSharedUsername(response.data.username || "User");
          const items = Array.isArray(response.data.content)
            ? response.data.content
            : response.data.content
            ? [response.data.content]
            : [];
          setSharedContents(items);
          setSharedError(null);
        })
        .catch((err) => {
          console.error("Error fetching shared brain:", err);
          setSharedError("Shared brain not found or has been revoked.");
        })
        .finally(() => {
          setSharedLoading(false);
        });
    }
  }, [hash]);

  const activeContents = isSharedView ? sharedContents : contents;

  const filteredContents = activeContents.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.type?.toLowerCase() === selectedFilter.toLowerCase();
  });

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
        }
      });
      refresh();
    } catch (err) {
      console.error("Error deleting content:", err);
      alert("Failed to delete content. Please try again.");
    }
  };

  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || ""
          }
        }
      );

      const linkHash = response.data.hash || response.data.message;
      if (!linkHash) {
        alert("Failed to generate share link.");
        return;
      }

      const shareUrl = `${window.location.origin}/share/${linkHash}`;
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        alert(`Share link copied to clipboard!\n\n${shareUrl}`);
      } else {
        prompt("Copy your share link:", shareUrl);
      }
    } catch (error) {
      console.error("Error generating share link:", error);
      alert("Error sharing brain. Please make sure you are logged in.");
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      {!isSharedView && (
        <Sidebar
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <div className={`p-4 sm:p-6 flex-1 h-screen overflow-y-auto ${!isSharedView ? "md:ml-64" : ""}`}>
        {!isSharedView && (
          <CreateContentModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onAdded={refresh}
          />
        )}

        {/* Top Header / Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            {!isSharedView && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                title="Open menu"
                aria-label="Open sidebar menu"
              >
                <MenuIcon />
              </button>
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {isSharedView
                  ? `${sharedUsername}'s Second Brain`
                  : selectedFilter === "all"
                  ? "All Notes"
                  : selectedFilter === "youtube"
                  ? "YouTube Videos"
                  : selectedFilter === "twitter"
                  ? "Twitter / X Posts"
                  : "Articles"}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {isSharedView
                  ? "Public view of saved links and notes"
                  : "Manage and organize your knowledge base"}
              </p>
            </div>
          </div>

          {!isSharedView && (
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-end">
              <Button
                onClick={handleShare}
                variant="secondary"
                text="Share Brain"
                startIcon={<ShareIcon />}
              />
              <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                text="Add Content"
                startIcon={<PlusIcons />}
              />
            </div>
          )}
        </div>

        {/* Error / Loading States */}
        {sharedError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
            {sharedError}
          </div>
        )}

        {(loading || sharedLoading) && (
          <div className="text-gray-500 py-12 text-center">Loading contents...</div>
        )}

        {/* Cards Grid */}
        {!loading && !sharedLoading && filteredContents.length > 0 && (
          <div className="flex gap-4 sm:gap-6 flex-wrap items-start justify-center sm:justify-start">
            {filteredContents.map((item) => (
              <Card
                key={item._id}
                contentId={item._id}
                type={item.type}
                link={item.link}
                title={item.title}
                onDelete={isSharedView ? undefined : handleDelete}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !sharedLoading && filteredContents.length === 0 && !sharedError && (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center max-w-lg mx-auto mt-12">
            <h3 className="text-lg font-medium text-gray-700">No content found</h3>
            <p className="text-sm text-gray-500 mt-2">
              {isSharedView
                ? "This user has not added any public content yet."
                : selectedFilter !== "all"
                ? `You don't have any ${selectedFilter} items yet.`
                : "Click 'Add Content' above to add your first YouTube or Twitter link!"}
            </p>
            {!isSharedView && selectedFilter === "all" && (
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => setModalOpen(true)}
                  variant="primary"
                  text="Add Content"
                  startIcon={<PlusIcons />}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;