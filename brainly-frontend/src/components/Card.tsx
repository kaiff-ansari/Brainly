import { useEffect } from "react";
import ArticleIcon from "../icons/ArticleIcon";
import ExternalLinkIcon from "../icons/ExternalLinkIcon";
import TrashIcon from "../icons/TrashIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YouTubeIcon from "../icons/YouTubeIcon";

interface CardProps {
  contentId?: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | string;
  onDelete?: (id?: string) => void;
}

function getYouTubeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.slice(1).split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (parsed.pathname.startsWith("/shorts/")) {
      const id = parsed.pathname.replace("/shorts/", "").split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    const v = parsed.searchParams.get("v");
    if (v) {
      return `https://www.youtube.com/embed/${v}`;
    }
    if (parsed.pathname.startsWith("/embed/")) {
      return url;
    }
  } catch {
    // fallback
  }
  return url.replace("watch?v=", "embed/");
}

const Card = ({ contentId, title, link, type, onDelete }: CardProps) => {
  useEffect(() => {
    if (type === "twitter" && typeof (window as any).twttr?.widgets?.load === "function") {
      (window as any).twttr.widgets.load();
    }
  }, [link, type]);

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm w-80 min-h-64 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-md font-medium text-gray-800 truncate">
            <span className="text-purple-600 flex-shrink-0">
              {type === "youtube" ? (
                <YouTubeIcon />
              ) : type === "twitter" ? (
                <TwitterIcon />
              ) : (
                <ArticleIcon />
              )}
            </span>
            <span className="truncate" title={title}>
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600 transition-colors p-1"
              title="Open Link"
            >
              <ExternalLinkIcon />
            </a>

            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(contentId)}
                className="hover:text-red-500 transition-colors p-1 cursor-pointer"
                title="Delete item"
              >
                <TrashIcon />
              </button>
            )}
          </div>
        </div>

        <div className="pt-2 w-full overflow-hidden">
          {type === "youtube" && (
            <iframe
              className="w-full aspect-video rounded-md"
              src={getYouTubeEmbedUrl(link)}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}

          {type === "twitter" && (
            <div className="w-full">
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </blockquote>
            </div>
          )}

          {type !== "youtube" && type !== "twitter" && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex flex-col justify-between h-44">
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 capitalize mb-2">
                  {type || "Article"}
                </div>
                <h4 className="font-semibold text-gray-800 line-clamp-2 text-sm mb-1">
                  {title}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {link.replace(/^https?:\/\/(www\.)?/, "")}
                </p>
              </div>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-700 bg-white border border-purple-200 rounded-md hover:bg-purple-50 transition-colors"
              >
                Read Article
                <ExternalLinkIcon />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;