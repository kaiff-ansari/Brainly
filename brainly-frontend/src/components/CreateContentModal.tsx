import { useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";
import InputFormContent from "./InputFormContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

const ContentType = {
    Youtube: "youtube",
    Twitter: "twitter",
    Article: "article"
} as const;

type ContentType = (typeof ContentType)[keyof typeof ContentType];

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
    onAdded?: () => void;
}

const CreateContentModal = ({ open, onClose, onAdded }: CreateContentModalProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>(ContentType.Youtube);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const addContent = async () => {
        const title = titleRef.current?.value?.trim();
        const link = linkRef.current?.value?.trim();

        if (!title || !link) {
            setErrorMessage("Please enter both a title and a link");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {
            await axios.post(
                `${BACKEND_URL}/api/v1/content`,
                {
                    title,
                    link,
                    type
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("jwtToken") || ""
                    }
                }
            );

            if (titleRef.current) titleRef.current.value = "";
            if (linkRef.current) linkRef.current.value = "";
            onAdded?.();
            onClose();
        } catch (error) {
            console.error("Error adding content:", error);
            setErrorMessage("Failed to add content. Please check your inputs and try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900 opacity-60"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div className="relative bg-white p-6 rounded-xl shadow-2xl z-10 w-96 max-w-full m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Add Content</h2>
                    <div onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-800">
                        <CrossIcon />
                    </div>
                </div>

                {errorMessage && (
                    <div className="text-red-500 text-sm mb-2 px-2">
                        {errorMessage}
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <InputFormContent ref={titleRef} placeholder="Title" />
                    <InputFormContent
                        ref={linkRef}
                        placeholder={
                            type === ContentType.Youtube
                                ? "YouTube video link"
                                : type === ContentType.Twitter
                                ? "Tweet link"
                                : "Article or website link"
                        }
                    />
                </div>

                <div className="my-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 px-2">Type</h3>
                    <div className="flex gap-2 px-2 flex-wrap">
                        <Button
                            text="Youtube"
                            variant={type === ContentType.Youtube ? "primary" : "secondary"}
                            onClick={() => setType(ContentType.Youtube)}
                        />
                        <Button
                            text="Twitter"
                            variant={type === ContentType.Twitter ? "primary" : "secondary"}
                            onClick={() => setType(ContentType.Twitter)}
                        />
                        <Button
                            text="Article"
                            variant={type === ContentType.Article ? "primary" : "secondary"}
                            onClick={() => setType(ContentType.Article)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button onClick={onClose} variant="secondary" text="Cancel" />
                    <Button onClick={addContent} loading={loading} variant="primary" text="Submit" />
                </div>
            </div>
        </div>
    );
};

export default CreateContentModal;