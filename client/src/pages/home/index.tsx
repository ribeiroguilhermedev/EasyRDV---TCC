import { useState } from "react"
import Header from "../../components/header/header";
import EmployeeRegisterDialog from "../../components/dialogs/employeeRegisterDialog";
import Aside from "../../components/aside/aside";
import EmployeeControl from "../../components/modules/employeeControl";

const Home = () => {


  const [isOpen, setOpen] = useState(false);
  const [employeeControlOpen, setEmployeeControlOpen] = useState(false)



  return (
    <>
    <header>
      <Header isOpen={isOpen} setOpen={setOpen}/>
    </header>
    <aside>
      <Aside employeeControlOpen={employeeControlOpen} setEmployeeControlOpen={setEmployeeControlOpen}/>
    </aside>
    <main>
     {employeeControlOpen && <EmployeeControl employeeControlOpen={employeeControlOpen} setEmployeeControlOpen={setEmployeeControlOpen}/>} 
    </main>
      <EmployeeRegisterDialog open={isOpen} onClose={() => setOpen(false)} />
    </>
  )
}

export default Home