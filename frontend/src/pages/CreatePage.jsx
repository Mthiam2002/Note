import toast from 'react-hot-toast';
import  { useState } from 'react';
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from 'react-router';
import api from '../lib/axios';


const CreatePage = () => {
  const [title, setTitle ] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!title.trim() || !content.trim()) {
      toast.error("Veuillez remplir tous les tableaux!");
      return;
    }

    setLoading(true);
    try {
      await api.post('/notes', {
        title,
        content
      });
      toast.success('Note Créée avec succès');
      navigate("/");
    } catch (error) {
      console.log("Erreur lors de la création de la note", error);
      if(error.response?.status === 429 ) {
        toast.error("Calmez-vous! Vous créez des notes trop rapidement", {
          duration: 4000,
          icon:"💀"
        });
        setIsRateLimited(true);
        } else {
          toast.error("failed to load notes")
        }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px4 py-8'>
        <div className='mac-w2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className="size-5" />
              Retour aux notes
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Créer une Nouvelle Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className="label">
                    <span className='label-text'>Titre</span>
                  </label>
                  <input type="text" 
                      placeholder='Titre Note'
                      className='input input-bordered'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className="label">
                    <span className='label-text'>Contenu</span>
                  </label>
                  <textarea 
                      placeholder='Écrivez vos notes ici...'
                      className='textarea textarea-bordered h-32'
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    { loading ? "Création..." : "Créer Note" }
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage