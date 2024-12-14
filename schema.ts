const PageSchema = ({
    "usage-type": "page", //
    "url": "www.something.com",
    "gif-url": "some-url.for.uu",
    "author": "someone's-id",
    "id": "some-id",
    "components": [
        "<<component-id>>"
    ],
    "functions": [
        "<<function-id>>"
    ],
    "collaborators": [
        "<<profile-id>>"
    ],
    "author-md-comments": `
        Some comments in Markdown
    `,
    "download-options": [
        [ "svelte", "svelte-repo.github-or-gitlab-or-whatever.com" ], // it just takes you there
        [ "react", "now-in-react.com" ] // if the response is retrieved as file, is just downloads
    ]
})

const FunctionSchema = ({
    "usage-type": "Function", //
    "url": "www.something.com",
    "gif-url": "some-url.for.uu",
    "author": "someone's-id",
    "id": "<<component-id>>",
    "author-md-comments": `
        Some code and comments in Markdown
    `,
    "collaborators": [
        "<<profile-id>>"
    ],
    "download-options": [
        [ "svelte", "svelte-repo.github-or-gitlab-or-whatever.com/function-path" ], // it just takes you there
        [ "react", "now-in-react.com/function-path" ] // if the response is retrieved as file, is just downloads
    ]
})

const ComponentSchema = ({
    "usage-type": "Component", //
    "url": "www.something.com",
    "gif-url": "some-url.for.uu",
    "author": "someone's-id",
    "id": "<<component-id>>",
    "author-md-comments": `
        Some code and comments in Markdown
    `,
    "collaborators": [
        "<<profile-id>>"
    ],
    "download-options": [
        [ "svelte", "svelte-repo.github-or-gitlab-or-whatever.com/function-path" ], // it just takes you there
        [ "react", "now-in-react.com/function-path" ] // if the response is retrieved as file, is just downloads
    ]
})

const SavesSchema = ({
    "<<category-id>>": {
        "components": [
            "<<component-id>>"
        ],
        "functions": [
            "<<function-id>>"
        ],
        "pages": [
            "<<page-id>>"
        ],
        "profiles": [
            "<<profile-id>>"
        ],
    }
})

const CategorySchema = ({
    "<<category-id>>": {
        "name": "some name",
        children: [
            "<<category-id>>"
        ]
    }
})

const ProfileSchema = ({
    "id": "<<profile-id>>",
    "name": "some name",
    "contacts": {
        "email": "some-email@verify-each-value-on-backend.pls"
    },
    "access-token-for-editing": "blablabla blablabla",
    "categories": [
        "<<category-id>>"
    ],
    "components": [
        "<<component-id>>"
    ],
    "functions": [
        "<<function-id>>"
    ],
    "pages": [
        "<<page-id>>"
    ]
})

