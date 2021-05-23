package dream_model

import (
	"context"
	"time"

	connection "github.com/mv0409/k7-tech/go-mongo/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

//Issue - struct to map with mongodb documents
type Dream struct {
	ID          primitive.ObjectID `bson:"_id"`
	Title       string             `bson:"title"`
	Description string             `bson:"description"`
	Date        string             `bson:"date"`
	Type        string             `bson:type`
	CreatedAt   time.Time          `bson:"created_at"`
	UpdatedAt   time.Time          `bson:"updated_at"`
}

type Base string

const (
	Sad      Base = "sad"
	Happy    Base = "happy"
	Exciting Base = "exciting"
	Scary    Base = "scary"
)

type Sequence struct {
	DataTypesToString []Base
}

func CreateDream(dream Dream) (*mongo.InsertOneResult, error) {
	var clientInstanceError error
	client, err := connection.GetMongoClient()
	if err != nil {
		clientInstanceError = err
	}
	collection := client.Database(connection.DB).Collection(connection.DREAMS)
	result, err := collection.InsertOne(context.TODO(), &Dream{
		ID:          primitive.NewObjectID(),
		Title:       dream.Title,
		Description: dream.Description,
		Type:        dream.Type,
		Date:        dream.Date,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	})
	if err != nil {
		clientInstanceError = err
	}
	return result, clientInstanceError
}

func GetDreams() ([]Dream, error) {
	var dreams []Dream
	var clientInstanceError error
	client, err := connection.GetMongoClient()
	if err != nil {
		clientInstanceError = err
	}
	collection := client.Database(connection.DB).Collection(connection.DREAMS)

	cursor, err := collection.Find(context.TODO(), bson.M{})
	if err != nil {
		clientInstanceError = err
	}
	defer cursor.Close(context.TODO())
	for cursor.Next(context.TODO()) {
		var dream Dream
		cursor.Decode(&dream)
		dreams = append(dreams, dream)
	}
	if err := cursor.Err(); err != nil {
		clientInstanceError = err
	}
	return dreams, clientInstanceError
}

func DeleteDream(id primitive.ObjectID) (*mongo.DeleteResult, error) {
	var clientInstanceError error
	client, err := connection.GetMongoClient()
	if err != nil {
		clientInstanceError = err
	}
	collection := client.Database(connection.DB).Collection(connection.DREAMS)
	result, err := collection.DeleteOne(context.TODO(), bson.M{"_id": id})
	if err != nil {
		clientInstanceError = err
	}
	return result, clientInstanceError

}

func UpdateDream(id primitive.ObjectID, dream Dream) (*mongo.UpdateResult, error) {
	var clientInstanceError error
	client, err := connection.GetMongoClient()
	if err != nil {
		clientInstanceError = err
	}
	collection := client.Database(connection.DB).Collection(connection.DREAMS)
	result, err := collection.UpdateOne(context.TODO(), bson.M{"_id": id}, bson.D{
		{"$set", bson.D{{"title", dream.Title}}},
	})
	if err != nil {
		clientInstanceError = err
	}
	return result, clientInstanceError
}

func GetDreamTypes() (obj Sequence) {
	obj = Sequence{[]Base{Sad, Happy, Exciting, Scary}}
	return obj
}
