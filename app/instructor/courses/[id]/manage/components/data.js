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
                text: 'Film & Edit',
                link: 'film'
            },
            {
                icon: SettingsIcon,
                text: 'Curriculum',
                link: 'curriculum'
            },
            {
                icon: CircleIcon,
                text: 'Captions (optional)',
                link: 'captions'
            },
        ]
    },
    {
        title: 'Publish your course',
        links: [
            {
                icon: CircleIcon,
                text: 'Course messages',
                link: 'messages'
            },
        ]
    }
]