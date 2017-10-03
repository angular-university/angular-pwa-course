import {DbUser} from "./db-user";

export const USERS: { [key: number]: DbUser } = {
    1: {
        id: 1,
        email: 'student@gmail.com',
        // ADMIN user (password is Password10) can read all lessons and also can login on behalf of other users
        passwordDigest: '$argon2i$v=19$m=4096,t=3,p=1$vfrhde0OMBNSSE9rRWtVrQ$gBaNgJFPBZfzuvrzfX8iSr2+OCD8K8Iu/JjwpYp8/TY',
        roles: ['STUDENT']
    },
    2: {
        id: 2,
        email: 'admin@gmail.com',
        // normal user (password is Password10), does not have access to login as another user functionality
        passwordDigest: '$argon2i$v=19$m=4096,t=3,p=1$vfrhde0OMBNSSE9rRWtVrQ$gBaNgJFPBZfzuvrzfX8iSr2+OCD8K8Iu/JjwpYp8/TY',
        roles: ['STUDENT', 'ADMIN']
    }
};


export const LESSONS = {

    1: {
        id: 1,
        "description": "Angular Tutorial For Beginners - Build Your First App - Hello World Step By Step",
        "longDescription": "<p>This is step by step guide to create your first  application. <b>Its aimed at beginners</b> just starting out with the framework.This lesson will show how to create a component, and how to link the component to a given custom HTML tag. It will show how to give the component a given template.</p>",
        "tags": "BEGINNER",
        "duration": "4:17",
        "url": "https://www.youtube.com/watch?v=LVrF-aQ6NxQ",
        "videoUrl": "https://www.youtube.com/embed/du6sKwEFrhQ"
    },
    2: {
        id: 2,
        "description": "Building Your First  Component - Component Composition",
        "duration": "2:07",
        "longDescription": "<p>In this lesson we are going to see how to include a component inside another component. We are going to create a simple search box component and include it in our main application.</p>",
        "tags": "BEGINNER",
        "url": "angular2-build-your-first-component",
        "videoUrl": "https://www.youtube.com/embed/VES1eTNxi1s"
    },
    3: {
        id: 3,
        "description": "Component @Input - How To Pass Input Data To an  Component",
        "duration": "2:33",
        "longDescription": "<p>In this lesson we are going to learn how to use the  template syntax for properties, and learn how we can use it to pass input data to a component. We are going to see also a simplified input syntax for passing constant strings as component inputs.</p>",
        "tags": "BEGINNER",
        "url": "angular2-passing-data-to-component-using-input",
        "videoUrl": "https://www.youtube.com/embed/Yfebo2mFrTU"
    },
    4: {
        id: 4,
        "description": " Component Events - Using @Output to create custom events",
        "duration": "4:44",
        "longDescription": "<p>In this lesson we are going to see how components can emit custom events via EventEmitter and the @Output decorator. We are going to see how we can subscribe to standard browser events, and how the syntax for that is exactly the same as in the case of custom component events. We will also learn how Typescript literals can be used to output variables inside template strings.</p>",
        "tags": "BEGINNER",
        "url": "angular2-component-events",
        "videoUrl": "https://www.youtube.com/embed/dgyVrJ2XCq4"
    },
    5: {
        id: 5,
        "description": " Component Templates - Inline Vs External",
        "duration": "2:55",
        "longDescription": "<p>In this lesson we are going to learn how a component template can be defined both inline and in an external file. We are going to learn how to configure the component so that Angular can find the template at the correct location, using the module commonjs variable. We are going to learn also some best practices for component naming, from the official  Style Guide.</p>",
        "tags": "BEGINNER",
        "url": "angular2-component-templates-internal-vs-external"
    },
    6: {
        id: 6,
        "description": "Styling  Components - Learn About Component Style Isolation",
        "duration": "3:27",
        "longDescription": "<p>In this lesson we are going to learn how components can be styled using both inline styles and an external css file. We will learn some more best practices on file naming. We will learn how the mechanism for style isolation works in.</p>",
        "tags": "BEGINNER",
        "url": "angular2-components-styling-component-isolation"
    },
    7: {
        id: 7,
        "description": " Component Interaction - Extended Components Example",
        "duration": "9:22",
        "longDescription": "<p>In this lesson we are going to put together all that we have learned so far about components to create a more complex example. We are going to create two components: a color picker and a color previewer and see how they can interact.</p>",
        "tags": "BEGINNER",
        "url": "angular2-components-component-interaction"
    },
    8: {
        id: 8,
        "description": " Components Tutorial For Beginners - Components Exercise !",
        "duration": "1:26",
        "longDescription": "<p>In this video we are going to present an exercise for putting in practice the several concepts that we have learned so far about components.</p>",
        "tags": "BEGINNER",
        "url": "angular2-components-exercise"
    },
    9: {
        id: 9,
        "description": " Components Tutorial For Beginners - Components Exercise Solution Inside",
        "duration": "2:08",
        "longDescription": "<p>This video contains the solution for the introduction to components exercise.</p>",
        "tags": "BEGINNER",
        "url": "angular2-components-exercise-solution"
    },
    10: {
        id: 10,
        "description": " Directives - Inputs, Output Event Emitters and How To Export Template References",
        "duration": "4:01",
        "longDescription": "<p>Components are actually simply just Directives. All the functionality that we have learned so far about Components also applies to Directives. In this lesson we are going to learn how to Directives can also have inputs and outputs, and how the use of the decorators @Input and @Output also applies to directives. We are also learn a new functionality for exporting a template reference for the directive itself into the template on which the directive is being used.</p> ",
        "tags": "BEGINNER",
        "url": "angular2-directives-inputs-outputs-event-emitters"
    }

};