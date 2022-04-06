import CardsRequests from "../services/CardsRequests.js";

function movingСard(statusesResponse) {
   const statuses = statusesResponse.map((status) => {
      return status.value;
   });

   async function previousCard(id, currentStatus) {
      const idStatus = statuses.findIndex((status) => status === currentStatus);
      const newStatus = idStatus !== 0 ? statuses[idStatus - 1] : statuses[0];
      const result = await CardsRequests.updateStatusCard(id, newStatus);
      return result;
   }

   async function nextCard(id, currentStatus) {
      const idStatus = statuses.findIndex((status) => status === currentStatus);
      const newStatus =
         idStatus !== statuses.length - 1
            ? statuses[idStatus + 1]
            : statuses[statuses.length - 1];
      const result = await CardsRequests.updateStatusCard(id, newStatus);
      return result;
   }

   return {
      prev: previousCard,
      next: nextCard,
   };
}

export { movingСard };
