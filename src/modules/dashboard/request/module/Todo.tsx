import { DraggableItems, HandleDragEnd, ProjectCard } from '@/components';
import { Project } from '@/types/types';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';


const Todo = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', title: 'Project 1' },
    { id: '2', title: 'Project 2' },
    { id: '3', title: 'Project 3' },
    { id: '4', title: 'Project 4' },
  ]);


  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(event) => HandleDragEnd(event, projects, setProjects)}
    >
      <SortableContext items={projects.map((project) => project.id)} strategy={verticalListSortingStrategy}>
        <div className="pb-8">
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {projects.map((project) => (
              <DraggableItems
                key={project.id}
                id={project.id}
                item={project}
                ItemComponent={({ item }) => <ProjectCard data={[item]} />}
              />
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Todo;
