import { useState } from "react"
import Header from "../../components/header/header";
import Aside from "../../components/aside/aside";
import EmployeeControl from "../../components/modules/employeeControl";
import Paper from "@mui/material/Paper";

const Home = () => {
  const [employeeControlOpen, setEmployeeControlOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex h-full">
          <Aside employeeControlOpen={employeeControlOpen} setEmployeeControlOpen={setEmployeeControlOpen} />
          <Paper className="w-full pt-5 rounded-none" square={true}>
            {employeeControlOpen && <EmployeeControl employeeControlOpen={employeeControlOpen} setEmployeeControlOpen={setEmployeeControlOpen} />}
          </Paper>
        </div>
      </div>
    </>
  )
}

export default Home