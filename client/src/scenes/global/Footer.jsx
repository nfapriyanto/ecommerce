import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            ecomms
          </Typography>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Tentang Kami
          </Typography>
          <Typography mb="30px">Karier</Typography>
          <Typography mb="30px">Toko Kami</Typography>
          <Typography mb="30px">Syarat & Ketentuan</Typography>
          <Typography mb="30px">Kebijakan Privasi</Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Layanan Pelanggan
          </Typography>
          <Typography mb="30px">Pusat Bantuan</Typography>
          <Typography mb="30px">Lacak Pesanan Anda</Typography>
          <Typography mb="30px">Pembelian Korporat & Grosir</Typography>
          <Typography mb="30px">Pengembalian & Penukaran</Typography>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Hubungi Kami
          </Typography>
          <Typography mb="30px">
            Jl. Margonda Raya No. 100, Depok, Jawa Barat 16424
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: contact@gunadarma.com
          </Typography>
          <Typography mb="30px">(222)333-4444</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
