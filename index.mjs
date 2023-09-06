import { initialize } from "zokrates-js";

initialize().then((zokratesProvider) => {
  const source = "def main(private field a) -> field { return a + a; }";

  // compilation
  const artifacts = zokratesProvider.compile(source);

  // computation
  const { witness, output } = zokratesProvider.computeWitness(artifacts, ["3"]);
  console.log("🚀 ~ file: index.mjs:11 ~ initialize ~ output:", output);

  // run setup
  const keypair = zokratesProvider.setup(artifacts.program);

  // generate proof
  const proof = zokratesProvider.generateProof(
    artifacts.program,
    witness,
    keypair.pk
  );

  // export solidity verifier
  const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk);

  // or verify off-chain
  const isVerified = zokratesProvider.verify(keypair.vk, proof);
  console.log("🚀 ~ file: index.mjs:28 ~ initialize ~ isVerified:", isVerified);
});
