import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button
                onClick={ () => navigate('/allusers')}
                className='btn btn-outline'
            >
                All Users
            </button>
            <button
                onClick={ () => navigate('/addfood')}
                className='btn btn-outline'
            >
                Add Food
            </button>
            <button
                onClick={ () => navigate('/managefoods')}
                className='btn btn-outline'
            >
                Manage Food
            </button>
            <button
                onClick={ () => navigate('/manage-upcoming-foods')}
                className='btn btn-outline'
            >
                Manage Upcoming Food
            </button>
        </div>
    );
};

export default AdminDashboard;