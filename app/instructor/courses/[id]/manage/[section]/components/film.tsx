import React from 'react'

const Film = () => {
  return (
    <div>
      <div className="mt-6 mb-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">You’re ready to share your knowledge.</h2>
        <p className="mt-2 text-l text-gray-600">
        This is your moment! If you’ve structured your course and used our guides, you're well prepared for the actual shoot. Pace yourself, take time to make it just right, and fine-tune when you edit.
        </p>
      </div>

      <div className="mt-6 mb-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Tips</h2>
        <p className="mt-2 text-l text-gray-600">
          <strong>Take breaks and review frequently.</strong><br />
          Check often for any changes such as new noises. Be aware of your own energy levels--filming can tire you out and that translates to the screen.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Build rapport.</strong><br />
          Students want to know who’s teaching them. Even for a course that is mostly screencasts, film yourself for your introduction. Or go the extra mile and film yourself introducing each section!
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Being on camera takes practice.</strong><br />
          Make eye contact with the camera and speak clearly. Do as many retakes as you need to get it right.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Set yourself up for editing success.</strong><br />
          You can edit out long pauses, mistakes, and ums or ahs. Film a few extra activities or images that you can add in later to cover those cuts.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Create audio marks.</strong><br />
          Clap when you start each take to easily locate the audio spike during editing. Use our guides to manage your recording day efficiently.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>For screencasts, clean up.</strong><br />
          Move unrelated files and folders off your desktop and open any tabs in advance. Make on-screen text at least 24pt and use zooming to highlight.
        </p>
      </div>

      <div className="mt-6 mb-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
        <ul className='list-disc'>
          <li>Film and export in HD to create videos of at least 720p, or 1080p if possible</li>
          <li>Audio should come out of both the left and right channels and be synced to your video</li>
          <li>Audio should be free of echo and background noise so as not to be distracting to students</li>
        </ul>
      </div>
    </div>
  )
}

export default Film