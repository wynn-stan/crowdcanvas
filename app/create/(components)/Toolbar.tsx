import { type Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  LucideIcon,
  UnderlineIcon,
} from "lucide-react";
import styled from "styled-components";

interface Group {
  [key: string]: {
    Icon: LucideIcon;
    toggle: () => void;
  };
}

export default function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const chainer = () => editor.chain().focus();

  //items
  const groups: Group[] = [
    {
      bold: {
        Icon: BoldIcon,
        toggle: () => chainer().toggleBold().run(),
      },
      italic: {
        Icon: ItalicIcon,
        toggle: () => chainer().toggleItalic().run(),
      },
      underline: {
        Icon: UnderlineIcon,
        toggle: () => chainer().toggleUnderline().run(),
      },
    },

    // {
    //   bulletList: {
    //     Icon: ListIcon,
    //     toggle: () => chainer().toggleBulletList().run(),
    //   },
    // },
  ];

  return (
    <div className=" flex justify-center bg-gray-15 py-5 overflow-auto">
      {groups.map((group, index) => (
        <StyledGroup key={index}>
          {Object.keys(group).map((key, index) => {
            const Icon = group[key].Icon;
            const isActive = editor.isActive(key);
            return (
              <span
                key={index}
                onClick={group[key].toggle}
                className={`${isActive && "bg-blue"}`}
              >
                <Icon
                  color={isActive ? "white" : undefined}
                  className="cursor-pointer"
                />
              </span>
            );
          })}
        </StyledGroup>
      ))}
    </div>
  );
}

const StyledGroup = styled.div`
  border-left: 3px solid #dddddd;
  padding: 0px 30px;
  display: flex;
  gap: 20px;
`;
