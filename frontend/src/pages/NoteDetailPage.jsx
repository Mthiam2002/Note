import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeftIcon, HandHelping, LoaderIcon, TrashIcon } from 'lucide-react';
import api from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving,setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Erreur lors de la récupération des notes", error)
        toast.error("Erreur en de chargement des notes...");
      } finally {
      setLoading(false);
    }
    };

    fetchNote();

  }, [id]);

  const handleDelete = async() => {
    if(!window.confirm("Êtes vous sur de vouloir supprimer cette note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note supprimée");
      navigate("/");
    } catch (error) {
      console.log("Erreur lors de la suppression de la note", error);
      toast.error("Erreur en supprimant la note");
    }
  };
  const handleSave = async() => {
    if(!note.title.trim() || !note.content.trim()) {
      toast.error("Veuillez ajouter un titre ou du contenu");
      return;
    }
    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note modifiée avec succès");
      navigate("/");
    } catch (error) {
      console.log("Erreur lors de la sauvegarde de la note", error)
      toast.error("Erreur en de sauvegardant la note");
    } finally {
      setSaving(false);
    }

  }

  if(loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to={"/"} className='btn btn-ghost'>
              <ArrowLeftIcon className='h-5 w-5' />
              Retour aux Notes
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <TrashIcon className='h-5 ww-5' />
              Supprimer Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className='form-control mb-4'>
                  <label className="label">
                    <span className='label-text'>Titre</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder='Titre note'
                    className='input input-bordered'
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                  />
              </div>

              <div className='form-control mb-4'>
                  <label className="label">
                    <span className='label-text'>Contenu</span>
                  </label>
                  <textarea 
                      placeholder='Écrivez vos notes ici...'
                      className='textarea textarea-bordered h-32'
                      value={note.content}
                      onChange={(e) => setNote({ ...note, content: e.target.value })}
                  />
              </div>

              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  { saving ? "Sauvegarde..." : "Modifier Note" }
                </button>
              </div>

            </div>
          </div>



        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage