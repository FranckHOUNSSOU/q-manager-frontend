import { useState, useEffect } from "react";
import "./Staff.css";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PersonPlusFill, TrashFill } from "react-bootstrap-icons";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { getAllUsers } from "../../../../api/auth";

interface UserData {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

function Staff() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des utilisateurs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const handleChange = ({ selectedRows }: { selectedRows: any }) => {
    setSelectedRows(selectedRows);
  };

  const handleDelete = (userId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet agent ?")) {
      console.log("Delete user:", userId);
      // TODO: Implémenter la suppression
    }
  };

  const columns = [
    {
      name: <span className="fs-8">S/N</span>,
      width: "5%",
      cell: (row:any) =>
        users.findIndex((s) => s._id === row._id) + 1,
    },
    {
      name: <span className="fs-8">Agent Name</span>,
      width: "19%",
      cell: (row:any) => row.firstName + " " + row.lastName,
    },
    {
      name: <span className="fs-8">Email</span>,
      width: "29%",
      cell: (row:any) => row.email,
    },
    {
      name: <span className="fs-8">Phone</span>,
      width: "18%",
      cell: (row:any) => row.phone,
    },
    {
      name: <span className="fs-8">Rôle</span>,
      width: "14%",
      cell: (row:any) => row.role === "admin" ? "Administrateur" : "Agent",
      center: true
    },
    {
      name: <span className="fs-8">Action</span>,
      width: "14%",
      center: true,
      cell: (row:any) => {
        return (
          <button
            className="btn btn-sm btn-outline-danger delete-btn"
            onClick={() => handleDelete(row._id)}
            title="Delete"
          >
            <TrashFill size={16} />
          </button>
        );
      },
    },
  ];

  return (
    <>
    <div className="staff-page">
      <div className="staff-header">
        <div>
          <h2 className="staff-title">Staff</h2>
          <p className="staff-text">Gestion du personnel.</p>
        </div>
        <Button 
          variant="primary" 
          className="add-agent-btn"
          onClick={() => navigate("/agentInterface/addAgent")}
        >
          <PersonPlusFill size={18} className="me-2" />
          Add an agent
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="staff-table-container">
        <Card>
        <Card.Body>
          <div className="mb-1" style={{ height: "2rem" }}>
            {selectedRows?.length > 0 && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{fontSize:"1rem"}}>{selectedRows?.length} Agent(s) selected</span>
                  <Button variant="light" size="sm" style={{fontSize:"1rem"}}>
                    <TrashFill size={16} />
                  </Button>
                </div>
              </>
            )}
          </div>
          <DataTable
            pagination
            selectableRows
            onSelectedRowsChange={handleChange}
            customStyles={{
              headRow: {
                style: {
                  backgroundColor: "rgb(77, 182, 172)",
                  border: "none",
                  marginBottom: "0.5rem",
                  fontWeight: "bolder",
                },
              },
              rows: {
                style: {
                  border: "1px solid #e9ecef",
                  borderRadius: "0.5rem",
                  marginBottom: "0.5rem",
                  height: "fit-content",
                  whiteSpace: "normal",
                  padding: "0.25rem",
                  "&:hover": {
                    borderColor: "#007bff",
                  },
                },
              },
            }}
            columns={columns}
            data={users}
            noDataComponent={
              <div
                className={
                  "min-h-350px d-flex align-items-center justify-content-center"
                }
              >
                <h3>No agents found</h3>
              </div>
            }
          />
        </Card.Body>
      </Card>
          {users.length === 0 && (
            <div className="text-center py-4 text-muted">
              Aucun utilisateur trouvé
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
}

export default Staff;
