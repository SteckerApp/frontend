import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DraggableItemProps<T> {
  item: T;
  ItemComponent: React.FC<{ item: T }>;
  id: string;
}

const DraggableItem = <T extends { id: string }>({ item, ItemComponent, id }: DraggableItemProps<T>) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transform ? 'transform 0.2s ease' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ItemComponent item={item} />
    </div>
  );
};

export default DraggableItem