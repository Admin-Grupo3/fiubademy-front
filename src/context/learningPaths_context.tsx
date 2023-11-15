import React, { useEffect } from "react";
import { LearningPathContextType, LearningPathType } from "../@types/sideBarType.tsx";
import { getLearningPaths } from "../login/backend-api";
export const LearningPathsContext = React.createContext<LearningPathContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const LearningPathsProvider: React.FC<Props> = ({ children }) => {
  const [learningPaths, setLearningPath] = React.useState<LearningPathType[]>([]);

  const fetchLearningPaths = () => {
    const data = getLearningPaths();
    data.then((learningPathsData: any) => {
      console.log("learning paths data:", learningPathsData);
      setLearningPath(learningPathsData.learningPaths);
    }).catch(error => {
      console.error('Error al obtener learning paths:', error);
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
    getLearningPaths();
  }, []);

  return (
    <LearningPathsContext.Provider value={{
      learningPaths, getLearningPath, getLearningPaths
    }}>
      {children}
    </LearningPathsContext.Provider>
  )
}

export default LearningPathsProvider;