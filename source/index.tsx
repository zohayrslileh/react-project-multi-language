import { createRoot } from "react-dom/client"
import View from "./View"

/*
|-----------------------------
|  Define container 🧊
|-----------------------------
|
|
*/
const container = document.getElementById("root")

/*
|-----------------------------
|  Create root 🪸
|-----------------------------
|
|
*/
const root = createRoot(container!)

/*
|-----------------------------
|  Render view ⚡
|-----------------------------
|
|
*/
root.render(<View />)