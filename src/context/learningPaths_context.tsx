import React, { useEffect } from "react";
import { LearningPathContextType, LearningPathType } from "../@types/sideBarType.tsx";
import { getLearningPaths, getPurchasedLearningPaths } from "../login/backend-api";
export const LearningPathsContext = React.createContext<LearningPathContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const LearningPathsProvider: React.FC<Props> = ({ children }) => {
  const [learningPaths, setLearningPath] = React.useState<LearningPathType[]>([]);
  const [purchasedLearningPaths, setPurchasedLearningPaths] = React.useState<LearningPathType[]>([]);

  const fetchLearningPaths = () => {
    const data = getLearningPaths();
    data.then((learningPathsData: any) => {
      console.log("learning paths data:", learningPathsData);
      setLearningPath(learningPathsData.learningPaths);
    }).catch(error => {
      console.error('Error al obtener learning paths:', error);
    });
  }

  const fetchPurchasedLearningPaths = () => {
    const data = getPurchasedLearningPaths();
    data.then((learningPathsData: any) => {
      console.log("LEARNING PATH DATA", learningPathsData);
      setPurchasedLearningPaths(learningPathsData.learningPaths);
      }).catch(error => {
        console.error('Error al obtener cursos:', error);
      });
}

  const getLearningPath = (id: any) => {
    console.log("searching for learning path:", id);
    const singleLearningPath = learningPaths.find(learningPath => learningPath.id === id);
    console.log("found learning path:", singleLearningPath);

    return singleLearningPath;
  }

  useEffect(() => {
    console.log("USE EFFECT LEARNING PATHS");
    fetchLearningPaths();
    fetchPurchasedLearningPaths();
    getLearningPaths();
    getPurchasedLearningPaths();
  }, []);

  return (
    <LearningPathsContext.Provider value={{
      learningPaths, purchasedLearningPaths, getLearningPath, getLearningPaths, fetchPurchasedLearningPaths
    }}>
      {children}
    </LearningPathsContext.Provider>
  )
}

export default LearningPathsProvider;