import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

const handleDragEnd = <T extends { id: string }>(
  event: DragEndEvent,
  items: T[],
  setItems: React.Dispatch<React.SetStateAction<T[]>>
) => {
  const { active, over } = event;

  if (over && active.id !== over.id) {
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      setItems((currentItems) => arrayMove(currentItems, oldIndex, newIndex));
    }
  }
};

export default handleDragEnd;
