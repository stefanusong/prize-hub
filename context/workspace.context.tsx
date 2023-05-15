import { createContext, useEffect, useState } from 'react';

export interface IWorkspace {
    name: string,
    id: number
}

export type WorkspaceContextType = {
    workspaces: IWorkspace[];
    addWorkspace: (workspace: IWorkspace) => void;
    selectedWorkspace: IWorkspace;
    selectWorkspace: (workspace: IWorkspace) => void;
}

export const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export const WorkspaceProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState<IWorkspace>({ name: "-", id: 0 });

    const addWorkspace = (newWorkspace: IWorkspace) => {
        setWorkspaces([...workspaces, newWorkspace])
    }

    const selectWorkspace = (workspace: IWorkspace) => {
        setSelectedWorkspace(workspace)
    }

    useEffect(() => {
        fetch('api/workspaces')
            .then(response => response.json())
            .then(resp => {
                setWorkspaces(resp.data);
                setSelectedWorkspace(resp.data[0]);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <WorkspaceContext.Provider value={{ workspaces, addWorkspace, selectedWorkspace, selectWorkspace }}>
            {children}
        </WorkspaceContext.Provider>
    );
};
