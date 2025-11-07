import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const GET_WINE = gql`
  query GetWine($id: ID!) {
    wine(id: $id) {
      id
      name
    }
  }
`;

const CREATE_REVIEW = gql`
  mutation CreateReview($createReviewInput: CreateReviewInput!) {
    createReview(createReviewInput: $createReviewInput) {
      id
      rating
      comment
    }
  }
`;

function CreateReview() {
  const { wineId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: 1,
    wineId: parseInt(wineId),
    rating: 5,
    comment: '',
  });

  const { loading: loadingUsers, data: usersData } = useQuery(GET_USERS);
  const { loading: loadingWine, data: wineData } = useQuery(GET_WINE, {
    variables: { id: wineId },
  });

  const [createReview, { loading, error }] = useMutation(CREATE_REVIEW, {
    onCompleted: () => navigate(`/wine/${wineId}`),
  });

  useEffect(() => {
    if (usersData?.users?.length > 0) {
      setFormData({ ...formData, userId: usersData.users[0].id });
    }
  }, [usersData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview({
      variables: {
        createReviewInput: {
          ...formData,
          userId: parseInt(formData.userId),
          wineId: parseInt(wineId),
        },
      },
    });
  };

  if (loadingUsers || loadingWine) return <p>Carregando...</p>;

  return (
    <div>
      <Link to={`/wine/${wineId}`} className="text-purple-600 hover:underline mb-4 inline-block">
        ← Voltar ao vinho
      </Link>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Avaliar: {wineData?.wine?.name}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Usuário</label>
            <select
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {usersData?.users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nota (1-5)</label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Comentário</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Escreva sua opinião sobre o vinho..."
            />
          </div>

          {error && (
            <div className="text-red-500 bg-red-50 p-3 rounded">
              Erro: {error.message}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Avaliação'}
            </button>
            <Link
              to={`/wine/${wineId}`}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateReview;
