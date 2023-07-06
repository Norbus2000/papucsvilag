import React from 'react';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import LogoutOtherBrowserSessions from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm';
import TwoFactorAuthenticationForm from '@/Pages/Profile/Partials/TwoFactorAuthenticationForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import SectionBorder from '@/Components/SectionBorder';
import AppLayout from '@/Layouts/AppLayout';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { usePage } from '@inertiajs/react';

export default function Show({ sessions, confirmsTwoFactorAuthentication }) {
  const page = usePage();
  const { t } = useLaravelReactI18n();

  return (
    <AppLayout title={t('profile.profile')}>
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        {page.props.jetstream.canUpdateProfileInformation && (
          <div>
            <UpdateProfileInformationForm user={page.props.auth.user} />

            <SectionBorder />
          </div>
        )}

        {page.props.jetstream.canUpdatePassword && (
          <div className="mt-10 sm:mt-0">
            <UpdatePasswordForm />

            <SectionBorder />
          </div>
        )}
        {page.props.jetstream.canManageTwoFactorAuthentication && (
          <div className="mt-10 sm:mt-0">
            <TwoFactorAuthenticationForm
              requiresConfirmation={confirmsTwoFactorAuthentication}
            />

            <SectionBorder />
          </div>
        )}

        <div className="mt-10 sm:mt-0">
          <LogoutOtherBrowserSessions sessions={sessions} />
        </div>

        {page.props.jetstream.hasAccountDeletionFeatures && (
          <>
            <SectionBorder />

            <div className="mt-10 sm:mt-0">
              <DeleteUserForm />
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
