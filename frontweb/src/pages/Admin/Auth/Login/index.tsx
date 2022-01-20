import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import ButtonIcon from 'components/ButtonIcon';
import { requestBackendLogin } from 'utils/requests';

import './styles.css';

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = function (formData: FormData) {
    requestBackendLogin(formData)
      .then((response) => {
        setHasError(false);
        console.log(response.data);
      })
      .catch((error) => {
        setHasError(true);
        console.error(error);
      });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="mb-4 alert alert-danger">Credenciais inválidas</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('username', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido',
              },
            })}
            type="text"
            className="form-control base-input"
            placeholder="E-mail"
            name="username"
          />
          <div className="d-block invalid-feedback">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-2">
          <input
            {...register('password', { required: 'Campo obrigatório' })}
            type="password"
            className="form-control base-input "
            placeholder="Senha"
            name="password"
          />
          <div className="d-block invalid-feedback">
            {errors.password?.message}
          </div>
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueci a senha
        </Link>
        <div className="login-submit">
          <ButtonIcon text="Fazer login" />
        </div>
        <div className="signup-container">
          <span className="not-registered">Não tem Cadastro?</span>
          <Link to="/admin/auth/register" className="login-link-register">
            CADASTRAR
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
