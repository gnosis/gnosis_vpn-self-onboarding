{
  description = "A Nix flake for gnosis_vpn-self-onboarding (React + TypeScript + Vite)";

  inputs = {
    # Using the unstable channel for up-to-date packages
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      # Supported systems for the dev shell
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];

      # Helper function to generate attributes for each supported system
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            # Core packages needed for the development environment
            packages = with pkgs; [
              nodejs_22   # Standard modern Node.js version (adjust to nodejs_20 if needed)
              yarn        # Required for yarn.lock compatibility

              # Helpful utility tools for development
              nodePackages.typescript-language-server
              nodePackages.prettier
            ];

            # A startup script that runs when you enter the development shell
            shellHook = ''
              echo "🚀 Welcome to the gnosis_vpn-self-onboarding dev shell!"
              echo "Node version: $(node -v)"
              echo "Yarn version: $(yarn -v)"

              # Optional: automatically run yarn install if node_modules doesn't exist
              if [ ! -d "node_modules" ]; then
                echo "📦 Installing dependencies..."
                yarn install
              fi
            '';
          };
        }
      );
    };
}

