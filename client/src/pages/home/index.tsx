import { useState } from "react"
import Header from "../../components/header/header";
import Paper from "@mui/material/Paper";
import { EmployeeControl } from "../../components/modules";

const Home = () => {
  const [employeeControlOpen, setEmployeeControlOpen] = useState(true)
  const [panelOpen, setPanelOpen] = useState(!employeeControlOpen)

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header employeeControlOpen={employeeControlOpen} setEmployeeControlOpen={setEmployeeControlOpen} />
        <div className="flex justify-center shrink grow">
          <Paper className="w-full pt-5 rounded-none" square={true}>
            {employeeControlOpen && <EmployeeControl employeeControlOpen={employeeControlOpen} setEmployeeControlOpen={setEmployeeControlOpen} />}
            {/* {panelOpen && <EmployeeControl employeeControlOpen={employeeControlOpen} setEmployeeControlOpen={setEmployeeControlOpen} />} */}
          </Paper>
        </div>
      </div>
    </>
  )
}

export default Home