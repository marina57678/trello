import HTTPService from "./HTTPService";
import UserStorage from "../utils/UserStorage.js";

class CardsRequests {
   async loadAllCards() {
      const cards = await HTTPService.request({
         path: `/cards`,
         userToken: UserStorage.token,
      });
      return cards;
   }

   async loadCard(id) {
      const card = await HTTPService.request({
         path: `/cards/${id}`,
         userToken: UserStorage.token,
      });

      return card;
   }

   async addCard({ title, description }, status) {
      const data = {
         title,
         description,
         status,
      };
      console.log("title" + title);
      const newCard = await HTTPService.request({
         method: "POST",
         path: `/cards`,
         userToken: UserStorage.token,
         data,
      });

      return newCard;
   }

   async updateCard(id, title, description) {
      const data = {
         title,
         description,
      };

      const updCard = await HTTPService.request({
         method: "PUT",
         path: `/cards/${id}`,
         userToken: UserStorage.token,
         data,
      });

      return updCard;
   }

   async updateStatusCard(id, status) {
      const data = {
         status,
      };

      const updCard = await HTTPService.request({
         method: "PUT",
         path: `/cards/${id}`,
         userToken: UserStorage.token,
         data,
      });

      return updCard;
   }

   async deleteCard(id) {
      const deletedCard = await HTTPService.request({
         method: "DELETE",
         path: `/cards/${id}`,
         userToken: UserStorage.token,
      });

      return deletedCard;
   }
}

export default new CardsRequests();
