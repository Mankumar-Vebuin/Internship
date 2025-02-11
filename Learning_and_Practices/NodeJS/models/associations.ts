import { Orm_User } from "./orm_user.ts";
import { Contact } from "./contact.ts";

Orm_User.hasOne(Contact, { foreignKey: "user_id", as: "contact" });
Contact.belongsTo(Orm_User, { foreignKey: "user_id", as: "user" });

export { Orm_User, Contact };
