/* eslint-disable @typescript-eslint/no-empty-object-type */
import Sidebar from '@/components/sidebar/sidebar'
import React, { PropsWithChildren } from 'react'

interface IDashboardLayoutProps extends PropsWithChildren { }
function DashboardLayout({ children }: IDashboardLayoutProps) {
    return (
        <div className="h-screen w-screen overflow-hidden flex bg-gray-300">
            <Sidebar />
            <div className="overflow-y-auto grow ps-4 p-8">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout