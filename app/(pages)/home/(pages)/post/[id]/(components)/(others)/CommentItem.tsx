"use client";

import { UserContext } from "@/Contexts/user";
import { CommentModel } from "@/models";
import { deleteCommentService } from "@/services/post";
import { Dropdown } from "@restart/ui";
import dayjs from "dayjs";
import { Dot, MoreHorizontal, Trash2 } from "lucide-react";
import { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function CommentItem({
  comment,
  mutate,
}: {
  comment: CommentModel;
  mutate: () => void;
}) {
  //hooks
  const { user } = useContext(UserContext);

  //variables
  const hasActions = user?.id === comment?.created_by;

  //functions
  const handleDelete = () => {
    comment &&
      deleteCommentService(comment.id)
        .then(() => {
          toast.success("Success");
          mutate();
        })
        .catch((err) => {
          toast.error("Something unexpected happened. Please try again");
        });
  };

  return (
    <div className="flex gap-4 justify-between">
      <div className="flex gap-4">
        <img
          src={comment.author?.profile_image_url}
          className="rounded-full"
          alt="img"
          width={40}
          height={40}
        />
        <div className="flex flex-col gap-2 ">
          <div className="flex items-center">
            <span className="text-xs">{comment.author?.first_name}</span>
            <Dot />
            <span className="text-xs text-gray-30">{dayjs(comment.updatedAt).fromNow()}</span>
          </div>
          <div className="text-sm text-gray-50">{comment.content}</div>
        </div>
      </div>
      {hasActions && (
        <div>
          <Dropdown>
            <Dropdown.Toggle>
              {(props) => (
                <div {...props} className="cursor-pointer">
                  <MoreHorizontal />
                </div>
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu flip placement="bottom-start" fixed offset={[0, 18]}>
              {(menuProps, meta) => (
                <div
                  {...menuProps}
                  style={{
                    position: "fixed",
                    right: "34px",
                    transition: "visibility 500ms, opacity 500ms",
                    display: meta.show ? "block" : "none",
                    opacity: meta.show ? "1" : "0",
                  }}
                >
                  <StyledButton onClick={() => handleDelete()}>
                    <span>Delete</span>
                    <Trash2 size={16} className="text-gray-30" />
                  </StyledButton>
                </div>
              )}
            </Dropdown.Menu>
          </Dropdown>
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
