import "dotenv/config";
import { app } from "./app/index";

app.listen(process.env.PORT, () => {
  console.log(`⚡[server]: Listen on http://localhost:${process.env.PORT}`);
});
