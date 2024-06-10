import { dag, Container, Directory, object, func } from "@dagger.io/dagger"

@object()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class DevopsTools {
  /**
   *  usage: "dagger call build-and-publish --binary-path ~/bin"
   */
  @func()
  async buildAndPublish(binaryPath: Directory): Promise<string> {

    let filteredSource = binaryPath

    filteredSource = filteredSource.withoutDirectory(`/contrib`).
                                  withoutDirectory(`/esptool-linux`).
                                  withoutDirectory(`/runtime`).
                                  withoutFile(`/*.sh`).
                                  withoutFile(`/proxy_socks_gestion`).
                                  withoutFile(`/*.ini`).
                                  withoutFile(`/FoxitReader`)

    return dag
      .container()
      .from("ubuntu:noble")
      .withDirectory("/devops-bin", filteredSource).publish("digiosysops/devops-tools:latest")
  }
}

