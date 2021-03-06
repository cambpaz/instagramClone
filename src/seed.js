export function seedDatabase(firebase) {
    const users = [{
            userId: 'AIzaSyDw5rec3lUrFIEJWk798v0GQVbwlFwNcp0',
            username: 'karl',
            fullName: 'Karl Hadwen',
            emailAddress: 'karlhadwen@gmail.com',
            following: ['2'],
            followers: ['2', '3', '4'],
            dateCreated: Date.now()
        },
        {
            userId: '2',
            username: 'raphael',
            fullName: 'Raffaello Sanzio da Urbino',
            emailAddress: 'raphael@sanzio.com',
            following: [],
            followers: ['AIzaSyDw5rec3lUrFIEJWk798v0GQVbwlFwNcp0'],
            dateCreated: Date.now()
        },
        {
            userId: '3',
            username: 'dali',
            fullName: 'Salvador Dalí',
            emailAddress: 'salvador@dali.com',
            following: [],
            followers: ['AIzaSyDw5rec3lUrFIEJWk798v0GQVbwlFwNcp0'],
            dateCreated: Date.now()
        },
        {
            userId: '4',
            username: 'orwell',
            fullName: 'George Orwell',
            emailAddress: 'george@orwell.com',
            following: [],
            followers: ['AIzaSyDw5rec3lUrFIEJWk798v0GQVbwlFwNcp0'],
            dateCreated: Date.now()
        }
    ];

    for (let k = 0; k < users.length; k++) {
        firebase.firestore().collection('users').add(users[k]);
    }

    for (let i = 1; i <= 5; ++i) {
        firebase
            .firestore()
            .collection('photos')
            .add({
                photoId: i,
                userId: '2',
                imageSrc: `/assets/photos/${i}.jpeg`,
                caption: 'Saint George and the Dragon',
                likes: [],
                comments: [{
                        displayName: 'dali',
                        comment: 'Love this place, looks like my animal farm!'
                    },
                    {
                        displayName: 'orwell',
                        comment: 'Would you mind if I used this picture?'
                    }
                ],
                userLatitude: '40.7128°',
                userLongitude: '74.0060°',
                dateCreated: Date.now()
            });
    }
}