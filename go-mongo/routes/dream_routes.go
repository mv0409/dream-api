package dream_routes

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	dream_model "github.com/mv0409/k7-tech/go-mongo/db/dream"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func createDream(w http.ResponseWriter, r *http.Request) {
	var dream dream_model.Dream
	json.NewDecoder(r.Body).Decode(&dream)
	defer r.Body.Close()
	result, err := dream_model.CreateDream(dream)
	jsonBytes, err := json.Marshal(result)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}

func getDreams(w http.ResponseWriter, r *http.Request) {
	result, err := dream_model.GetDreams()
	jsonBytes, err := json.Marshal(result)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}

func deleteDream(w http.ResponseWriter, r *http.Request) {
	idParam := mux.Vars(r)["id"]
	id, _ := primitive.ObjectIDFromHex(idParam)
	result, err := dream_model.DeleteDream(id)
	jsonBytes, err := json.Marshal(result)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}

func updateDream(w http.ResponseWriter, r *http.Request) {
	idParam := mux.Vars(r)["id"]
	id, _ := primitive.ObjectIDFromHex(idParam)
	var dream dream_model.Dream
	json.NewDecoder(r.Body).Decode(&dream)
	defer r.Body.Close()
	result, err := dream_model.UpdateDream(id, dream)
	jsonBytes, err := json.Marshal(result)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}

func HandleDreamRoutes() http.Handler {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", createDream).Methods("POST")
	router.HandleFunc("/", getDreams).Methods("GET")
	router.HandleFunc("/{id}", deleteDream).Methods("DELETE")
	router.HandleFunc("/{id}", updateDream).Methods("PUT")
	return router
}
