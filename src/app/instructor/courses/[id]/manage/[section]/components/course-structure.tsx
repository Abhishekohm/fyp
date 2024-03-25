import React from 'react'

const CourseStructure = () => {
  return (
    <div>
      <div className="mt-6 mb-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Plan out your course</h2>
        <p className="mt-2 text-l text-gray-600">
          Planning your course carefully will create a clear learning path for students and help you once you film. Think down to the details of each lecture including the skill you’ll teach, estimated video length, practical activities to include, and how you’ll create introductions and summaries.
        </p>
      </div>

      <div className="mt-6 mb-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Tips</h2>
        <p className="mt-2 text-l text-gray-600">
          <strong>Start with your goals.</strong><br />
          Setting goals for what learners will accomplish in your course (also known as learning objectives) at the beginning will help you determine what content to include in your course and how you will teach the content to help your learners achieve the goals.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Create an outline.</strong><br />
          Decide what skills you’ll teach and how you’ll teach them. Group related lectures into sections. Each section should have at least 3 lectures, and include at least one assignment or practical activity.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Introduce yourself and create momentum.</strong><br />
          People online want to start learning quickly. Make an introduction section that gives learners something to be excited about in the first 10 minutes.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Sections have a clear learning objective.</strong><br />
          Introduce each section by describing the section's goal and why it’s important. Give lectures and sections titles that reflect their content and have a logical flow.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Lectures cover one concept.</strong><br />
          A good lecture length is 2-7 minutes to keep students interested and help them study in short bursts. Cover a single topic in each lecture so learners can easily find and re-watch them later.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Practice activities create hands-on learning.</strong><br />
          Help learners apply your lessons to their real world with projects, assignments, coding exercises, or worksheets.
        </p>
      </div>


      <div className="mt-6 mb-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
        <ul className='list-disc'>
          <li>Your course must have at least five lectures</li>
          <li>All lectures must add up to at least 30+ minutes of total video</li>
          <li>Your course is composed of valuable educational content and free of promotional or distracting materials</li>
        </ul>
      </div>
    </div>
  )
}

export default CourseStructure;