/**
 * Created by jakepodell on 4/18/17.
 */
public class main {
    public static void main(String[] args) {
        Perceptron p = new Perceptron();
        double inputs[][] = {{0.466 - 0.451, 0.778 - 0.748, 40.6 - 42.4, 14.2 - 13.8},
                            {0.466 - 0.462, 0.778 - 0.742, 40.6 - 44.7, 14.2 - 15.0},
                            };
        int outputs[] = {1,1, 0};

        p.Train(inputs, outputs, 0.2, 0.1, 200);
        System.out.println(p.Output(new double[]{0.466 - 0.451, 0.778 - 0.748, 40.6 - 42.4, 14.2 - 13.8}));
        System.out.println(p.Output(new double[]{0.466 - 0.462, 0.778 - 0.742, 40.6 - 44.7, 14.2 - 15.0}));

    }
}
