"use client";

import { useMemo, useState } from "react";
import { Reorder } from "motion/react";

type Character = {
  id: string;
  char: string;
};

export function DraggableString({ value }: { value: string }) {
  const initialCharacters = useMemo(
    () =>
      value.split("").map((char, index) => ({
        id: `${char}-${index}`,
        char,
      })),
    [value],
  );

  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [dragging, setDragging] = useState<string | null>(null);

  return (
    <div className="w-full overflow-x-auto py-8 font-mono">
      <Reorder.Group
        axis="x"
        values={characters}
        onReorder={setCharacters}
        className="flex w-max items-start gap-3 px-3"
      >
        {characters.map((item, index) => (
          <Reorder.Item
            key={item.id}
            value={item}
            layout="position"
            drag="x"
            dragMomentum={false}
            dragElastic={0}
            onDragStart={() => setDragging(item.id)}
            onDragEnd={() => setDragging(null)}
            animate={{
              scale: dragging === item.id ? 1.08 : 1,
              zIndex: dragging === item.id ? 50 : 1,
            }}
            transition={{
              layout: {
                type: "spring",
                stiffness: 700,
                damping: 40,
              },
              scale: {
                type: "spring",
                stiffness: 500,
                damping: 25,
              },
            }}
            className="flex touch-none flex-col items-center gap-2"
          >
            <div className="flex size-14 cursor-grab items-center justify-center border-primary border border-dashed bg-primary/10 text-xl font-semibold shadow-sm select-none active:cursor-grabbing">
              {item.char === " " ? "␣" : item.char}
            </div>

            <span className="text-xs text-primary font-bold">{index}</span>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
