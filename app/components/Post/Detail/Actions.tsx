"use client";

import { UserContext } from "@/Contexts/user";
import ToHome from "@/app/components/ToHome/ToHome";
import { CommentModel, PostModel } from "@/models";
import { deletePostService } from "@/services/post";
import { ArrowLeft, PencilLine, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function Actions({ post }: { post?: PostModel }) {
  //hooks
  const { user } = useContext(UserContext);

  //navigation
  const router = useRouter();

  //variables
  const hasActions = post?.post_by === user?.id;

  //functions (delete)
  const handleDelete = () => {
    post &&
      deletePostService(post?.id)
        .then(() => {
          router.back();
          toast.success("Success");
        })
        .catch((err) =>
          toast.error("Something unexpected happened. Please try again")
        );
  };

  //functions (edit)
  const handleEdit = () => {
    post?.post_type === "post"
      ? router.push(`/edit/${post?.id}`)
      : router.push(`/events/edit/${post?.id}`);
  };

  return (
    <div className="w-full flex items-center gap-8">
      <ToHome>
        <ArrowLeft color="#82818F" />
      </ToHome>

      {hasActions && (
        <div className="flex gap-5">
          <StyledButton onClick={() => handleDelete()}>
            <span>Delete</span>
            <Trash2 size={16} className="text-gray-30" />
          </StyledButton>

          <StyledButton onClick={() => handleEdit()}>
            <span>Edit</span>
            <PencilLine size={16} className="text-gray-30" />
          </StyledButton>
        </div>
      )}
    </div>
  );
}

const StyledButton = styled.div`
  padding: 10px 16px;
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;

  border: 1px solid #e9e9e9;
  border-radius: 6px;

  font-size: 14px;
`;
