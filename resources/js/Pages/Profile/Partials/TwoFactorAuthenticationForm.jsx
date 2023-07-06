import { router } from '@inertiajs/core';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import classNames from 'classnames';
import React, { useState } from 'react';
import ActionSection from '@/Components/ActionSection';
import ConfirmsPassword from '@/Components/ConfirmsPassword';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function TwoFactorAuthenticationForm({ requiresConfirmation }) {
  const page = usePage();
  const [enabling, setEnabling] = useState(false);
  const [disabling, setDisabling] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [recoveryCodes, setRecoveryCodes] = useState([]);
  const [confirming, setConfirming] = useState(false);
  const [setupKey, setSetupKey] = useState(null);
  const { t } = useLaravelReactI18n();
  const confirmationForm = useForm({
    code: '',
  });
  const twoFactorEnabled =
    !enabling && page.props?.auth?.user?.two_factor_enabled;

  function enableTwoFactorAuthentication() {
    setEnabling(true);

    router.post(
      '/user/two-factor-authentication',
      {},
      {
        preserveScroll: true,
        onSuccess() {
          return Promise.all([
            showQrCode(),
            showSetupKey(),
            showRecoveryCodes(),
          ]);
        },
        onFinish() {
          setEnabling(false);
          setConfirming(requiresConfirmation);
        },
      },
    );
  }

  function showSetupKey() {
    return axios.get('/user/two-factor-secret-key').then(response => {
      setSetupKey(response.data.secretKey);
    });
  }

  function confirmTwoFactorAuthentication() {
    confirmationForm.post('/user/confirmed-two-factor-authentication', {
      preserveScroll: true,
      preserveState: true,
      errorBag: 'confirmTwoFactorAuthentication',
      onSuccess: () => {
        setConfirming(false);
        setQrCode(null);
        setSetupKey(null);
      },
    });
  }

  function showQrCode() {
    return axios.get('/user/two-factor-qr-code').then(response => {
      setQrCode(response.data.svg);
    });
  }

  function showRecoveryCodes() {
    return axios.get('/user/two-factor-recovery-codes').then(response => {
      setRecoveryCodes(response.data);
    });
  }

  function regenerateRecoveryCodes() {
    axios.post('/user/two-factor-recovery-codes').then(() => {
      showRecoveryCodes();
    });
  }

  function disableTwoFactorAuthentication() {
    setDisabling(true);

    router.delete('/user/two-factor-authentication', {
      preserveScroll: true,
      onSuccess() {
        setDisabling(false);
        setConfirming(false);
      },
    });
  }

  return (
    <ActionSection
      title={t('profile.two_fact_auth')}
      description={t('profile.two_fact_desc')}
    >
      {(() => {
        if (twoFactorEnabled && !confirming) {
          return (
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {t('profile.two_fact_enabled')}
            </h3>
          );
        }
        if (confirming) {
          return (
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {t('profile.two_fact_finish')}
            </h3>
          );
        }
        return (
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {t('profile.two_fact_disabled')}
          </h3>
        );
      })()}

      <div className="mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400">
        <p>{t('profile.two_fact_desc')}</p>
      </div>

      {twoFactorEnabled || confirming ? (
        <div>
          {qrCode ? (
            <div>
              <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                {confirming ? (
                  <p className="font-semibold">
                    {t('profile.two_fact_finish_desc')}
                  </p>
                ) : (
                  <p>{t('profile.two_fact_enabled_desc')}</p>
                )}
              </div>

              <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: qrCode || '' }}
              />

              {setupKey && (
                <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-semibold">
                    {t('profile.setup_key')}{' '}
                    <span
                      dangerouslySetInnerHTML={{ __html: setupKey || '' }}
                    />
                  </p>
                </div>
              )}

              {confirming && (
                <div className="mt-4">
                  <InputLabel htmlFor="code" value={t('profile.code')} />

                  <TextInput
                    id="code"
                    type="text"
                    name="code"
                    className="block mt-1 w-1/2"
                    inputMode="numeric"
                    autoFocus={true}
                    autoComplete="one-time-code"
                    value={confirmationForm.data.code}
                    onChange={e =>
                      confirmationForm.setData('code', e.currentTarget.value)
                    }
                  />

                  <InputError
                    message={confirmationForm.errors.code}
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          ) : null}

          {recoveryCodes.length > 0 && !confirming ? (
            <div>
              <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                <p className="font-semibold">
                  {t('profile.recovery_code_desc')}
                </p>
              </div>

              <div className="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 dark:bg-gray-900 rounded-lg">
                {recoveryCodes.map(code => (
                  <div key={code}>{code}</div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5">
        {twoFactorEnabled || confirming ? (
          <div>
            {confirming ? (
              <ConfirmsPassword onConfirm={confirmTwoFactorAuthentication}>
                <PrimaryButton
                  className={classNames('mr-3', { 'opacity-25': enabling })}
                  disabled={enabling}
                >
                  {t('profile.confirm')}
                </PrimaryButton>
              </ConfirmsPassword>
            ) : null}
            {recoveryCodes.length > 0 && !confirming ? (
              <ConfirmsPassword onConfirm={regenerateRecoveryCodes}>
                <SecondaryButton className="mr-3">
                  {t('profile.regenarete_codes')}
                </SecondaryButton>
              </ConfirmsPassword>
            ) : null}
            {recoveryCodes.length === 0 && !confirming ? (
              <ConfirmsPassword onConfirm={showRecoveryCodes}>
                <SecondaryButton className="mr-3">
                  {t('profile.show_codes')}
                </SecondaryButton>
              </ConfirmsPassword>
            ) : null}

            {confirming ? (
              <ConfirmsPassword onConfirm={disableTwoFactorAuthentication}>
                <SecondaryButton
                  className={classNames('mr-3', { 'opacity-25': disabling })}
                  disabled={disabling}
                >
                  {t('profile.cancel')}
                </SecondaryButton>
              </ConfirmsPassword>
            ) : (
              <ConfirmsPassword onConfirm={disableTwoFactorAuthentication}>
                <DangerButton
                  className={classNames({ 'opacity-25': disabling })}
                  disabled={disabling}
                >
                  {t('profile.disable')}
                </DangerButton>
              </ConfirmsPassword>
            )}
          </div>
        ) : (
          <div>
            <ConfirmsPassword onConfirm={enableTwoFactorAuthentication}>
              <PrimaryButton
                type="button"
                className={classNames({ 'opacity-25': enabling })}
                disabled={enabling}
              >
                {t('profile.enable')}
              </PrimaryButton>
            </ConfirmsPassword>
          </div>
        )}
      </div>
    </ActionSection>
  );
}
