"use client"

import React, { useContext, useRef, useState } from 'react';
import { Check, ChevronsUpDown, Loader2, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { WorkspaceContext, WorkspaceContextType } from "@/context/workspace.context"
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface WorkspaceSwitcherProps extends PopoverTriggerProps { }

export default function WorkspaceSwitcher({ className }: WorkspaceSwitcherProps) {
    const { data: session } = useSession()
    const [open, setOpen] = useState(false)
    const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] = useState(false)
    const [creatingWorkspace, setCreatingWorkspace] = useState(false)
    const { workspaces, addWorkspace, selectedWorkspace, selectWorkspace } = useContext(WorkspaceContext) as WorkspaceContextType
    const { toast } = useToast()

    const newWorkspaceName = useRef<HTMLInputElement | null>(null);

    const createNewWorkspace = async () => {
        setCreatingWorkspace(true)
        try {
            if (newWorkspaceName.current) {
                const workspaceName = newWorkspaceName.current.value;
                const response = await fetch('/api/workspaces', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: workspaceName }),
                });

                const resp = await response.json()

                if (resp.status != 200) {
                    toast({
                        title: "Failed to create workspace",
                        description: resp.message
                    })
                }

                const newWorkspace = resp.data
                addWorkspace(newWorkspace)

            }
        } catch (error) {
            alert(error)
            toast({
                title: "Failed to create workspace",
                description: error
            })
        }

        toast({
            title: "Workspace Created",
            description: `Successfully created ${newWorkspaceName.current?.value} workspace.`
        })
        setShowNewWorkspaceDialog(false)
        setCreatingWorkspace(false)
    };

    if (!session) {
        return (<></>)
    }

    return (
        <Dialog open={showNewWorkspaceDialog} onOpenChange={setShowNewWorkspaceDialog}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a workspace"
                        className={cn("w-[230px] justify-between text-start", className)}
                    >
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                                src={`https://avatar.vercel.sh/${selectedWorkspace.id}.png`}
                                alt={selectedWorkspace.name}
                            />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {selectedWorkspace.name}
                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[230px] p-0">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Search workspace..." />
                            <CommandEmpty>No workspace found.</CommandEmpty>
                            {workspaces.map((workspace) => (
                                <CommandItem
                                    key={workspace.id}
                                    onSelect={() => {
                                        selectWorkspace(workspace)
                                        setOpen(false)
                                    }}
                                    className="text-sm"
                                >
                                    <Avatar className="mr-2 h-5 w-5">
                                        <AvatarImage
                                            src={`https://avatar.vercel.sh/${workspace.id}.png`}
                                            alt={workspace.name}
                                        />
                                        <AvatarFallback>WS</AvatarFallback>
                                    </Avatar>
                                    {workspace.name}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selectedWorkspace.name === workspace.name
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false)
                                            setShowNewWorkspaceDialog(true)
                                        }}
                                    >
                                        <PlusCircle className="mr-2 h-5 w-5" />
                                        Create Workspace
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create workspace</DialogTitle>
                    <DialogDescription>
                        Add a new workspace to manage your doorprize events.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="space-y-4 py-2 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Workspace name</Label>
                            <Input id="name" placeholder="Enter workspace name" ref={newWorkspaceName} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewWorkspaceDialog(false)}>
                        Cancel
                    </Button>

                    {!creatingWorkspace && (
                        <Button type="submit" onClick={createNewWorkspace}>Create</Button>
                    )}

                    {creatingWorkspace && (
                        <Button disabled type="submit" onClick={createNewWorkspace}>
                            <Loader2 className="animate-spin" />
                            Create</Button>
                    )}

                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}