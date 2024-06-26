import { CheckCircleIcon, CircleIcon, SettingsIcon } from "../utils/utilities";
export const sections = [
    {
        title: 'Plan your course',
        links: [
            {
                icon: CircleIcon,
                text: 'Intended learners',
                link: 'goals'
            },
            {
                icon: CheckCircleIcon,
                text: 'Course Structure',
                link: 'course-structure'
            },
            {
                icon: CircleIcon,
                text: 'Setup & test video',
                link: 'setup'
            },
        ]
    },
    {
        title: 'Create your content',
        links: [
            {
                icon: CircleIcon,
                text: 'Film & edit',
                link: 'film'
            },
            {
                icon: SettingsIcon,
                text: 'Curriculum',
                link: 'curriculum'
            },
        ]
    },
    {
        title: 'Publish your course',
        links: [
            {
                icon: CircleIcon,
                text: 'Course Landing Page',
                link: 'basics'
            },
            {
                icon: CircleIcon,
                text: 'Course messages',
                link: 'messages'
            },
        ]
    }
]