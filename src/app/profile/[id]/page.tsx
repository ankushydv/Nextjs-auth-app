export default function UserProfile({ params }: any) {
    return (
        <>
            <div className="flex flex-col items-center min-h-screen py-3">
                <h1 className="text-4xl font-mono pt-3">Profile</h1>
                <p className="flex items-center justify-center min-h-screen"> User Profile <span className="text-blue-600 font-mono italic bg-white p-1 rounded ml-1">{params.id}</span></p>
            </div>
        </>
    )
}