export const schema = {
    "models": {
        "Post": {
            "syncable": true,
            "name": "Post",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ],
            "fields": {
                "id": {
                    "name": "id",
                    "targetName": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "targetName": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "comments": {
                    "name": "comments",
                    "targetName": "comments",
                    "isArray": true,
                    "type": {
                        "model": "Comment"
                    },
                    "isRequired": false,
                    "attributes": [
                        {
                            "type": "connection",
                            "properties": {
                                "name": "PostComments"
                            }
                        }
                    ]
                },
                "rating": {
                    "name": "rating",
                    "targetName": "rating",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "targetName": "status",
                    "isArray": false,
                    "type": {
                        "enum": "PostStatus"
                    },
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "Comment": {
            "syncable": true,
            "name": "Comment",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ],
            "fields": {
                "id": {
                    "name": "id",
                    "targetName": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "content": {
                    "name": "content",
                    "targetName": "content",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "post": {
                    "name": "post",
                    "targetName": "post",
                    "isArray": false,
                    "type": {
                        "model": "Post"
                    },
                    "isRequired": false,
                    "attributes": [
                        {
                            "type": "connection",
                            "properties": {
                                "name": "PostComments"
                            }
                        }
                    ]
                }
            }
        }
    },
    "enums": {
        "PostStatus": {
            "name": "PostStatus",
            "values": [
                "ACTIVE",
                "INACTIVE"
            ]
        }
    },
    "version": "6f6cb16389ad6c2218ecfcd0914c25ea"
};