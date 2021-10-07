import app from "./app.js";

// const PORT = 3000;

app.listen(process.env.PORT,()=>console.log(`listening on ${process.env.PORT}`));