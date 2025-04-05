import React, { useEffect, useState } from 'react'
import EnterpriseCard from './EnterpriseCard';
import Header from '../header/Header';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Cross } from 'lucide-react';
import { useForm } from 'react-hook-form';

const EnterpriseList = () => {

    const [employees, setEmployees] = useState([]);

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [categories, setCategories] = useState([]);

    const {
        register: registerCreateEmployee,
        handleSubmit: handleSubmitCreateEmployee,
        watch,
        formState: { errors: createEmployeeErrors },
    } = useForm();

    const onSubmitCreateEmployee = async (data) => {
        setIsCreating(true);
        console.log({
                    ...data,
                    commissionPercentage: parseInt(data.commissionPercentage),
                });
        try {
            const response = await fetch('https://apiv1.lacuponera.store/api/v1/register/enterprise', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    commissionPercentage: parseInt(data.commissionPercentage),
                    categoryId: parseInt(data.categoryId),
                }),
            });
            if (!response.ok) {
                throw new Error('Error creating employee');
            }
            const result = await response.json();
            console.log('Employee created:', result);
            setIsCreateDialogOpen(false);
            setIsCreating(false);
            setEmployees((prev) => [...prev, result.user]);
        } catch (error) {
            console.error('Error creating employee:', error);
            setIsCreating(false);
        }
    };


    useEffect(() => {
        const fetchEnterprises = async () => {
            try {
                const response = await fetch('https://apiv1.lacuponera.store/api/v1/admin/enterprises',
                    {
                        method: 'GET',
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        }
                    });
                const data = await response.json();
                setEmployees((prev) => [...data]);
                console.log(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://apiv1.lacuponera.store/api/v1/categories', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!res.ok) throw new Error('Error fetching categories');
                const data = await res.json();
                setCategories(data.categories);
                console.log(data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchEnterprises();
        fetchCategories();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-3xl font-bold mb-4">Lista de Empresas</h1>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                    <Button size="lg" className="flex items-center gap-1 mb-4">
                        <Cross className="h-4 w-4" />
                        Agregar Empresa
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Employee</DialogTitle>
                        <DialogDescription>
                            Make changes to the employee details and click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmitCreateEmployee(onSubmitCreateEmployee)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <label className="block text-sm font-medium text-gray-700">Enterprise Name</label>
                            <input type="text" {...registerCreateEmployee("firstName", { required: true })} className="border rounded px-3 py-2" />

                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input type="text" {...registerCreateEmployee("description", { required: true })} className="border rounded px-3 py-2" />

                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" {...registerCreateEmployee("email", { required: true })} className="border rounded px-3 py-2" />

                            <label className="block text-sm font-medium text-gray-700">Comission Percentage</label>
                            <input type="number" {...registerCreateEmployee("commissionPercentage", { required: true })} className="border rounded px-3 py-2" />

                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="text" {...registerCreateEmployee("phone", { required: true })} className="border rounded px-3 py-2" />

                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input type="text" {...registerCreateEmployee("address", { required: true })} className="border rounded px-3 py-2" />

                            <label className="block text-sm font-medium text-gray-700">Categories</label>
                            <select {...registerCreateEmployee("categoryId", { required: true })} className="border rounded px-3 py-2">
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>

                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" {...registerCreateEmployee("password", { required: true })} className="border rounded px-3 py-2" />
                        </div>

                        <DialogFooter className="mt-4">
                            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={isCreating}>
                                Cancel
                            </Button>
                            <Button variant="primary" disabled={isCreating}>
                                {isCreating ? "Saving..." : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl p-4">
                {employees.map((enterprise, index) => (
                    <EnterpriseCard
                        key={index}
                        id={enterprise.id}
                        firstName={enterprise.user.firstName}
                        categories={categories}
                        description={enterprise.description}
                        department={enterprise.Category ? enterprise.Category.name : "Sin categoría"}
                        email={enterprise.user.email}
                        phone={enterprise.phone}
                        location={enterprise.location}
                        joinDate={enterprise.user.createdAt}
                        commissionPercentage={enterprise.commissionPercentage}
                        categoryId={enterprise.Category ? enterprise.Category.id : 1}
                        status={"Active"}
                        imageUrl={enterprise.imageUrl || "/placeholder.svg?height=200&width=200"}
                        accessLevel={"Enterprise"}
                        onEdit={() => console.log('Edit', enterprise.id)}
                        onDelete={() => console.log('Delete', enterprise.id)}
                        onViewDetails={() => console.log('View Details', enterprise.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default EnterpriseList;