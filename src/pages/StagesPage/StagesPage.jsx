import { useState, useEffect } from "react";
import * as stagesAPI from '../../utilities/stages-api'
import * as clientsAPI from '../../utilities/clients-api'
import './StagesPage.css'
import StageList from "../../components/StageList/StageList";

export default function StagesPage({ stages, setStages, user, clients, setClients }) { 

  useEffect(function() {
    async function getStages() {
      const allStages = await stagesAPI.getAllForUser()
      setStages(allStages);
    }
    getStages();
    async function getClients() {
      const allClients = await clientsAPI.getAllForUser()
      setClients(allClients);
    }
    getClients();
  }, []);



  return (
    <main className="StagesPage">
      <h1>StagesPage</h1>
      <StageList stages={stages} setStages={setStages} clients={clients}/>
    </main>
  )
}