import { beforeEach, describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import { UserDetails } from './user-details';
import { useAlbums } from '@/modules/album/api/hooks/use-albums.ts';
import { useUsers } from '@/modules/user/api/hooks/use-users.ts';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';

vi.mock('react-router-dom');
vi.mock('@/modules/user/api/hooks/use-users.ts');
vi.mock('@/modules/album/api/hooks/use-albums.ts');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

const renderComponent = (element: ReactNode) =>
  render(<Provider store={store}>{element}</Provider>);

describe('UserDetails', () => {
  const mockUseAlbums = useAlbums as jest.Mock;
  const mockUseUsers = useUsers as jest.Mock;
  const mockUseParams = useParams as jest.Mock;

  beforeEach(() => {
    mockUseAlbums.mockReturnValue({ data: [], isFetching: false });
    mockUseUsers.mockReturnValue({
      getUserData: vi.fn().mockReturnValue({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
      }),
    });
    mockUseParams.mockReturnValue({ userId: '1' });
  });

  it('should render user details with correct data', () => {
    renderComponent(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path='/user/:userId' element={<UserDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(
      screen.getByText('john.doe@example.com · 123-456-7890'),
    ).toBeInTheDocument();
  });

  it('should show loader when albums are being fetched', () => {
    mockUseAlbums.mockReturnValueOnce({ data: [], isFetching: true });

    renderComponent(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path='/user/:userId' element={<UserDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('fade-loader')).toBeInTheDocument();
  });

  it('should render albums if data is available', () => {
    mockUseAlbums.mockReturnValueOnce({
      data: [{ id: 1, userId: 1, title: 'Test Album' }],
      isFetching: false,
    });

    renderComponent(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path='/user/:userId' element={<UserDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByAltText('Test Album')).toBeInTheDocument();
  });

  it('should not throw errors if user data is missing', () => {
    mockUseUsers.mockReturnValueOnce({
      getUserData: vi.fn().mockReturnValue(null),
    });

    renderComponent(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path='/user/:userId' element={<UserDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });
});
