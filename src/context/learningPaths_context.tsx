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
      setLearningPath(learningPathsData.learningPaths);
    }).catch(error => {
      console.error('Error al obtener learning paths:', error);
    });
  }

  const fetchPurchasedLearningPaths = () => {
    const data = getPurchasedLearningPaths();
    data.then((learningPathsData: any) => {
      setPurchasedLearningPaths(learningPathsData.learningPaths);
      }).catch(error => {
        console.error('Error al obtener cursos:', error);
      });
}

  const getLearningPath = (id: any) => {
    const singleLearningPath = learningPaths.find(learningPath => learningPath.id === id);
    return singleLearningPath;
  }

  useEffect(() => {
    fetchLearningPaths();
    fetchPurchasedLearningPaths();
    getLearningPaths();
    getPurchasedLearningPaths();
  }, []);

  return (
    <LearningPathsContext.Provider value={{
      learningPaths, getLearningPath, getLearningPaths, purchasedLearningPaths
    }}>
      {children}
    </LearningPathsContext.Provider>
  )
}

export default LearningPathsProvider;