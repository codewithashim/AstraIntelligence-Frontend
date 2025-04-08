export interface LoginResponse {
    success: boolean;
    data?: {
      accessToken: string;
      user: {
        _id: string;
        name: string;
        email: string;
        phone?: string;
        role?: string;
      };
    };
    message?: string;
  }