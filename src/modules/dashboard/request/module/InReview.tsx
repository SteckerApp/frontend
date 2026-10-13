import { ProjectCard } from '@/components'


const InReview = () => {
  const data = [
    { id: '1', title: 'Project 1' },
    { id: '2', title: 'Project 2' },
    { id: '3', title: 'Project 3' },
    { id: '4', title: 'Project 4' },
  ]

  return (
    <div className='pt-8'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
        <ProjectCard data={data} />
      </div>
    </div>
  )
}

export default InReview
