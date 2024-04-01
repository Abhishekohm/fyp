import React from "react";

const Setup = () => {
  return (
    <div className="bg-white p-6 rounded-md shadow">
      <div className="mt-6 mb-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Arrange your ideal studio and get early feedback
        </h2>
        <p className="mt-2 text-l text-gray-600">
          It's important to get your audio and video set up correctly now,
          because it's much more difficult to fix your videos after you’ve
          recorded. There are many creative ways to use what you have to create
          professional looking video.
        </p>
      </div>

      <div className="mt-6 mb-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Tips</h2>
        <p className="mt-2 text-l text-gray-600">
          <strong>Equipment can be easy.</strong>
          <br />
          You don’t need to buy fancy equipment. Most smartphone cameras can
          capture video in HD, and you can record audio on another phone or
          external microphone.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Students need to hear you.</strong>
          <br />A good microphone is the most important piece of equipment you
          will choose. There are lot of affordable options. Make sure it’s
          correctly plugged in and 6-12 inches (15-30 cm) from you.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Make a studio.</strong>
          <br />
          Clean up your background and arrange props. Almost any small space can
          be transformed with a backdrop made of colored paper or an ironed bed
          sheet.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Light the scene and your face.</strong>
          <br />
          Turn off overhead lights. Experiment with three point lighting by
          placing two lamps in front of you and one behind aimed on the
          background.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Reduce noise and echo.</strong>
          <br />
          Turn off fans or air vents, and record at a time when it’s quiet.
          Place acoustic foam or blankets on the walls, and bring in rugs or
          furniture to dampen echo.
        </p>
        <p className="mt-2 text-l text-gray-600">
          <strong>Be creative.</strong>
          <br />
          Students won’t see behind the scenes. No one will know if you’re
          surrounded by pillows for soundproofing...unless you tell other
          instructors in the community!
        </p>
      </div>

      <div className="mt-6 mb-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
        <ul className="list-disc">
          <li>
            Film and export in HD to create videos of at least 720p, or 1080p if
            possible
          </li>
          <li>
            Audio should come out of both the left and right channels and be
            synced to your video
          </li>
          <li>
            Audio should be free of echo and background noise so as not to be
            distracting to students
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Setup;
